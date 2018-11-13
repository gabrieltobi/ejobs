export function getDocWithId(doc) {
    const docWithId = doc.data()
    docWithId.id = doc.id
    return docWithId
}

export function getDocsWithId(data) {
    return data.docs.map(getDocWithId)
}