import EncryptedStorage from 'react-native-encrypted-storage';

const set = async (key, object) => {
    try {
        await EncryptedStorage.setItem(key, JSON.stringify(object))
    } catch (error) {
        console.log('secure.set', error);
    }
}

const get = async (key) => {
    try {
        const data = await EncryptedStorage.getItem(key);

        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.log('secure.get', error);
    }
}

const remove = async (key) => {
    try {
        await EncryptedStorage.removeItem(key);
    } catch (error) {
        console.log('secure.remove', error);
    }
}

const wipe = async (key) => {
    try {
        await EncryptedStorage.clear();
    } catch (error) {
        console.log('secure.wipe', error);
    }
}

export default { set, get, remove, wipe }