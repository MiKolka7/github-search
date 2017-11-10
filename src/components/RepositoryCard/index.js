import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { number, shape, string } from 'prop-types';
import styles from './style';

export default class RepositoryCard extends Component {
    static propTypes = {
        data: shape({
            full_name:        string.isRequired,
            stargazers_count: number.isRequired,
            description:      string,
            language:         string
        })
    };

    _cutText(text, len) {
        let newText = '';

        if (text && text.length > len) {
            newText = text.substr(0, 30) + '...';
        }

        return newText || text;
    }

    render() {
        const { data, onSelected } = this.props;
        const { description, language, stargazers_count, full_name } = data;
        const descriptionCut = this._cutText(description, 30);

        return (
            <View style = { styles.cardContainer }>
                <TouchableOpacity activeOpacity = { 0.5 } onPress = { () => onSelected(data) }>
                    <View style = { styles.card }>
                        <View style = { styles.cardDetails }>
                            <View style = { styles.cardHeader }>
                                <Text style = { styles.cardTitle }>
                                    { full_name }
                                </Text>
                                <View style = { styles.cardStar }>
                                    {/*<Icon name = 'md-star' size = { 16 } color = '#F5B642' />;*/}
                                    <Text style = { styles.cardStarRatings }>
                                        { stargazers_count } star
                                    </Text>
                                </View>
                            </View>
                            { descriptionCut && <Text style = { styles.cardDescription }>
                                { descriptionCut }
                            </Text> }
                            <Text style = { styles.cardFooter }>
                                { language }
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
