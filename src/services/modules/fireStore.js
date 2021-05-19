import { DATA_BASE_NAME } from '../../utils/constants'
import fireStore from '../apiFireStore'

const db = fireStore.collection(DATA_BASE_NAME)

const getAll = () => db.orderBy('createdAt', 'desc').get()
const add = async (data) => db.add(data)
const deleteOne = async (id) => db.doc(id).delete()
const update = async (id, data) => db.doc(id).update(data)

export default { getAll, add, deleteOne, update }
