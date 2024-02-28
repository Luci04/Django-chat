import { create } from 'zustand'
import secure from './secure'
import api, { Address } from './api';
import utils from './utils'


// Socket Received Message Handler

function responseThumbnail(set, get, data) {
    set((state) => ({
        user: data
    }))
}


const useGlobal = create((set, get) => ({

    // Initialization
    initialized: false,

    init: async () => {
        const credentials = await secure.get('credentials');

        console.log(credentials);

        if (credentials) {

            try {
                const response = await api({
                    method: 'POST',
                    url: '/chat/signin/',
                    data: {
                        username: credentials.username,
                        password: credentials.password,
                    },
                })

                if (response.status !== 200) {
                    throw 'Authentication error';
                }

                const user = response.data.user;

                set((state) => ({
                    initialized: true,
                    authenticated: true,
                    user: user
                }))

                return;
            } catch (error) {
                console.log('useGlobal.init', error)
            }
        }

        set((state) => ({
            initialized: true
        }))

    }
    ,
    //Authentication

    authenticated: false,
    user: {},

    login: (user, cred, tokens) => {
        secure.set('credentials', cred);
        secure.set('tokens', tokens);


        set((state) => ({
            authenticated: true,
            user: user
        }))
    },

    logout: () => {
        secure.wipe();

        set((state) => ({
            authenticated: false,
            user: {}
        }))
    },

    // WebSocket

    socket: null,
    socketConnect: async () => {
        const tokens = await secure.get('tokens')

        const urls = `ws://${Address}/chat/?token=${tokens.access}`

        const socket = new WebSocket(
            urls
        )

        console.log("urls", urls);

        socket.onopen = () => {
            utils.log('Socket Open')
        }

        socket.onerror = (e) => {
            utils.log('Socket Error', e.message)
        }

        socket.onmessage = (data) => {
            //Convert data to JS object
            const parse = JSON.parse(data.data)

            utils.log('message: ', parse)

            const responses = {
                'thumbnail': responseThumbnail
            }

            const resp = responses[parse.source];

            if (!resp) {
                utils.log(`parsed.source ` + parse.source + ` not found`)
                return
            }

            resp(set, get, parse.data)
        }

        socket.onclose = () => {
            utils.log('Socket Close')
        }

        set((state) => ({
            socket: socket
        }))

        utils.log('Tokens', tokens);
    },
    socketClose: async () => {

    },


    // Thumbnail
    uploadThumbnail: (file) => {
        const socket = get().socket
        socket.send(JSON.stringify({
            source: 'thumbnail',
            base64: file.base64,
            filename: file.fileName
        }))
    }

}))

export default useGlobal;