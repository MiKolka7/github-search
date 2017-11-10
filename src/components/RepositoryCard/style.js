import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        borderRadius: 5,
        ...Platform.select({
            android: {
                marginHorizontal: 2,
            }
        }),
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    card: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 16,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    cardDetails: {
        flex: 1,
        paddingLeft: 10
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardTitle: {
        flex: 1,
        marginBottom: 5,
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
    },
    cardStar: {
        minWidth: 35,
        paddingTop: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cardDescription: {
        marginTop: 5,
        marginBottom: 5,
        color: '#636363',
        fontSize: 13
    },
    cardStarRatings: {
        marginLeft: 5,
        fontSize: 12
    },
    cardRunningHours: {
        marginLeft: 5,
        fontSize: 12
    },
    cardFooter: {
        textAlign: 'right'
    }
});

export default styles;
