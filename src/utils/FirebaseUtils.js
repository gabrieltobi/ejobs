export function getWithId(doc) {
    const docWithId = doc.data()
    docWithId.id = doc.id
    return docWithId
}