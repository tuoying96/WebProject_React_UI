export function getRedirectTo(header) {
    let path
    path = '/personal'

    // header
    if(!header) {
        // The user has not filled out personal information, redirect to info interface
        path = '/info'
    }
    return path
}
