import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        width: 200,
        alignItems: 'center'
    },
    textInput: {
        width: '100%',
        height: 35,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#353535'
    },
    btn: {
        minWidth: '100%',
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ddd'
    },
    img: {
        width: 120,
        height: 120,
        marginBottom: 20
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 10
    },
    
    alertBox: {
        height: 30,
        marginTop: 15,
    },
    alertText: {
        textAlign: 'center',
        color: 'red'
    }
});

export default styles;
