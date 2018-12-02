export function getDocWithId(doc) {
    if (doc.exists) {
        const docWithId = doc.data()
        docWithId.id = doc.id
        return docWithId
    }

    return null
}

export function getDocsWithId(data) {
    return data.docs.map(getDocWithId)
}