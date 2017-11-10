import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // ...Platform.select({
        //     ios: {
        //         paddingTop: 64
        //     }
        // })
    },

    infoContainer: {
        paddingVertical: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainerSmall: {
        flex: 0
    },

    textInput: {
        height: 35,
        paddingHorizontal: 8,
        backgroundColor: 'white'
    },
    searchBox: {
        marginTop: 10,
        marginHorizontal: 10,
        padding: 8,
        borderRadius: 5,
        zIndex: 1,
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    searchBoxBorder: {
        paddingHorizontal: 3,
        borderWidth: 1,
        borderRadius: 5
    },
    searchFilterBox: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 5
    },
    searchFilterBoxTitle: {
        paddingRight: 10,
        color: '#000',
        lineHeight: 25,
        fontSize: 14
    },

    separator: {
        marginTop: 10,
        backgroundColor: '#8E8E8E'
    },
    listView: {
        padding: 10,
        flex: 1
    },

    sortBtn: {
        minWidth: 50,
        marginHorizontal: 2,
        padding: 4,
        backgroundColor: '#f2f2f2',
        borderColor: '#999',
        borderRadius: 3
    },
    isActiveBtn: {
        backgroundColor: '#ddd'
    },
    textCenter: {
        textAlign: 'center'
    },

    modal: {
        width: '90%',
        height: '65%'
    },

    modalBtnClose: {
        position: 'absolute',
        bottom: 60,
        width: 100,
        left: '50%',
        marginLeft: -50,
        backgroundColor: "#ddd",
        paddingVertical: 5,
    }
});

export default styles;
