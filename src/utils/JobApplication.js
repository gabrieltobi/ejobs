import { COLLECTIONS, firebaseDb } from '../config/firebase'
import { toast } from 'react-toastify'

export const applyToJob = (jobId, personId) => {
    const addInPerson = firebaseDb.collection(COLLECTIONS.PEOPLE)
        .doc(personId)
        .set({
            jobs: {
                [jobId]: true
            }
        }, { merge: true })

    const addInJob = firebaseDb.collection(COLLECTIONS.JOBS)
        .doc(jobId)
        .set({
            people: {
                [personId]: true
            }
        }, { merge: true })

    return Promise.all([addInPerson, addInJob])
        .then(() => {
            toast.success('Candidatura realizada com sucesso!')
            return Promise.resolve()
        })
}

export const unapplyToJob = (jobId, personId) => {
    const removeFromPerson = firebaseDb.collection(COLLECTIONS.PEOPLE)
        .doc(personId)
        .get()
        .then((data) => {
            if (data.exists) {
                let person = data.data()
                const { [jobId]: removedId, ...jobs } = person.jobs
                person.jobs = jobs

                return firebaseDb.collection(COLLECTIONS.PEOPLE)
                    .doc(personId)
                    .set(person)
            }

            return Promise.resolve()
        })

    const removeFromJob = firebaseDb.collection(COLLECTIONS.JOBS)
        .doc(personId)
        .get()
        .then((data) => {
            if (data.exists) {
                let job = data.data()
                const { [personId]: removedId, ...people } = job.people
                job.people = people

                return firebaseDb.collection(COLLECTIONS.JOBS)
                    .doc(jobId)
                    .set(job)
            }

            return Promise.resolve()
        })

    return Promise.all([removeFromPerson, removeFromJob])
        .then(() => {
            toast.success('Candidatura removida com sucesso!')
            return Promise.resolve()
        })
}