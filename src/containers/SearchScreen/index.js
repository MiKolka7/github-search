import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AsyncStorage, ListView, Text, TextInput, View, WebView } from 'react-native';
import { object } from 'prop-types';
import debounce from 'lodash/debounce';
import Modal from 'react-native-modalbox';

import * as gitHubActions from '../../actions/github.actions';
import Styles from './style';
import RepositoryCard from '../../components/RepositoryCard';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';

const filters = require('./filters.json');

class SearchScreen extends Component {
    static propTypes = {
        actions:      object.isRequired,
        repositories: object.isRequired
    };

    constructor(props) {
        super(props);

        this.handleInputSearch = this._handleInputSearch.bind(this);
        this.findRepositoriesDebounce = debounce(this._findRepositories, 1000);
        this.onSelectedRep = this._onSelectedRep.bind(this);
        this.nextPage = this._nextPage.bind(this);
        this.onChangeSortBy = this._onChangeSortBy.bind(this);

        this.dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    }

    state = {
        openUrl: null,
        query:   '',
        sort:    ''
    };

    componentWillMount() {
        const { online } = this.props.network;

        if (online === false) {
            this._resetData();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { online } = this.props.network;
        const { online: onlineNew } = nextProps.network;
        const { list } = this.props.repositories.searchResult;
        const { query, page, sort } = this.props.repositories.searchParams;

        if (online !== onlineNew && query) {
            this.props.actions.onSearchRepositories(query, page, sort);
        }

        if (onlineNew === false && list && list.length === 0) {
            this._resetData();
        }
    }

    _resetData() {
        AsyncStorage.getItem('repositories').then((data) => {
            const rep = JSON.parse(data);

            if (rep) {
                this.props.actions.onRecoveryRepositories(rep);
            }
        });
    }

    _handleInputSearch(event) {
        const { page, sort } = this.props.repositories.searchParams;
        const { text } = event.nativeEvent;

        this.findRepositoriesDebounce(text, page, sort);
        this.setState(() => ({ query: text }));
    }

    _onSelectedRep(repository) {
        this.setState(() => ({ openUrl: repository.html_url }));
        this.refs.modal.open();
    }

    _onChangeSortBy(newSort) {
        const { query } = this.state;
        const { sort } = this.props.repositories.searchParams;

        if (query && sort !== newSort) {
            this.props.actions.onSearchRepositories(query, 1, newSort);
        }
    }

    _findRepositories(query, page, sort) {
        const { query: queryOld } = this.props.repositories.searchParams;

        if (query && query.length) {
            page = query !== queryOld ? 1 : page;
            this.props.actions.onSearchRepositories(query, page, sort);
        }
    }

    _nextPage() {
        const { query } = this.state;
        const { totalCount, list } = this.props.repositories.searchResult;
        const { page, sort } = this.props.repositories.searchParams;

        if (list.length < totalCount) {
            this._findRepositories(query, page + 1, sort);
        }
    }

    _renderListView() {
        const {
            searchResult: { list, totalCount },
            searchParams: { query },
            isFetching
        } = this.props.repositories;
        const { online } = this.props.network;
        let listView = null;

        if (list.length) {
            const dataSource = this.dataSource.cloneWithRows(list);

            const renderRowFn = (rowData) => (
                <RepositoryCard data = { rowData } onSelected = { this.onSelectedRep } />
            );
            const renderSeparatorFn = (sectionId, rowId) => (
                <View key = { rowId } style = { Styles.separator } />
            );
            const footerFn = () => (
                <View style = { { height: 60, justifyContent: 'center', marginTop: -10 } }>
                    { list.length < totalCount
                        ? isFetching && <ProgressBar />
                        : <Text style = { { textAlign: 'center' } }>That's all :(</Text>
                    }
                </View>
            );

            listView = (
                <ListView
                    enableEmptySections
                    style = { Styles.listView }
                    dataSource = { dataSource }
                    renderRow = { renderRowFn }
                    renderSeparator = { renderSeparatorFn }
                    renderFooter = { footerFn }
                    onEndReached = { () => this.nextPage() }
                    onEndReachedThreshold = { 500 }
                />
            );
        }
        else if (query && !list.length && online) {
            listView = (
                <View style = { Styles.listView }>
                    <Text>Sorry, we did not find anything, you're lucky another time =(</Text>
                </View>
            );
        }

        return listView;
    }

    _renderFilterBox() {
        const { sort = '' } = this.props.repositories.searchParams;

        const filterList = filters
            .sort((a, b) => a.order > b.order)
            .map(({ name, param }) => (
                <Button
                    key = { name }
                    onPress = { () => this.onChangeSortBy(param) }
                >
                    <View style = { [Styles.sortBtn, param === sort ? Styles.isActiveBtn : null] }>
                        <Text style = { Styles.textCenter }>{ name }</Text>
                    </View>
                </Button>
            ));

        return (
            <View style = { Styles.searchFilterBox }>
                <View>
                    <Text style = { Styles.searchFilterBoxTitle }>Sort by:</Text>
                </View>
                { filterList }
            </View>
        );
    }

    render() {
        const {
            searchParams: { page },
            searchResult: { list },
            isFetching
        } = this.props.repositories;
        const { online } = this.props.network;
        const { query, openUrl } = this.state;

        const isFetchingNewData = isFetching && page <= 1 && online;

        const bContent = (
            <Button
                style = { Styles.modalBtnClose }
                onPress = { () => this.refs.modal.close() }
            >
                <Text style = { Styles.textCenter }>Close</Text>
            </Button>
        );

        return (
            <View style = { Styles.container }>
                <View style = { Styles.searchBox }>
                    <View style = { Styles.searchBoxBorder }>
                        <TextInput
                            autoFocus
                            placeholder = { 'Enter the name of the repository' }
                            returnKeyType = { 'search' }
                            style = { Styles.textInput }
                            underlineColorAndroid = 'transparent'
                            disabled = { !online }
                            value = { query }
                            onChange = { this.handleInputSearch }
                        />
                    </View>
                    { this._renderFilterBox() }
                </View>

                { !online && (
                    <View style = { [Styles.infoContainer, list.length ? Styles.infoContainerSmall : null] }>
                        <Text>
                            Offline!
                            { list.length ? ' You see old results' : '' }
                        </Text>
                    </View>
                ) }

                { isFetchingNewData
                    ? <ProgressBar />
                    : this._renderListView()
                }

                <Modal
                    backdropPressToClose
                    backdropContent = { bContent }
                    position = { 'center' }
                    ref = { 'modal' }
                    style = { Styles.modal }
                    swipeToClose = { false }
                >
                    <WebView source = { { uri: openUrl } } />
                </Modal>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        repositories: state.github,
        network:      state.app.network
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(gitHubActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
