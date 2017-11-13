import { StyleSheet } from 'react-native';

const formWidth = 200;

const styles = StyleSheet.create({
    view: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center'
    },
    content: {
        width: formWidth,
        alignItems: 'center'
    },
    textInput: {
        width: formWidth,
        height: 35,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#353535'
    },
    btn: {
        minWidth: formWidth,
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
