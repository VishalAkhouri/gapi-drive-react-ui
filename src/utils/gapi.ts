const SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';

const handleClientLoad = async () => {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    await gapi.load('client:auth2', initClient);
};

const initClient = () => {
    // In practice, your app can retrieve one or more discovery documents.
    let discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    gapi.client.init({
        'clientId': process.env.CLIENT_ID,
        'apiKey': process.env.API_KEY,
        'discoveryDocs': [discoveryUrl],
        'scope': SCOPE
    })
};

const isAuth2SignedIn = () => {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
};

const auth2SignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
};

const auth2SignInListener = (callback: any) => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
};

const auth2SignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
};

const listFiles = (): Promise<any> => {
    return gapi.client.drive.files.list({
        'pageSize': 100,
        'fields': "nextPageToken, files(id, name, kind, mimeType)"
    });
};

export { handleClientLoad, isAuth2SignedIn, auth2SignIn, auth2SignOut, auth2SignInListener, listFiles };
