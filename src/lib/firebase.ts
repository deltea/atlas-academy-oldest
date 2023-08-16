import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, collection, getDocs, query, where, FieldPath, type WhereFilterOp, limit, addDoc, type DocumentData, setDoc, orderBy, type OrderByDirection, deleteDoc, QueryDocumentSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeNGeJx8wJ8rspuDa1SNJqtQQT3eSrg4M",
  authDomain: "atlas-academy-354dc.firebaseapp.com",
  projectId: "atlas-academy-354dc",
  storageBucket: "atlas-academy-354dc.appspot.com",
  messagingSenderId: "449551814429",
  appId: "1:449551814429:web:9711f106aade5055d39bf4",
  measurementId: "G-LNRLV5DSQ9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app);

export type PostType = "blog" | "reflection";

export interface PostData {
  slug: string,
  title: string,
  description: string,
  body: string,
  cover: string,
  tags: string[],
  date: string,
  type: PostType,
  podcast: string[],
}

export interface MarkerData {
  name: string,
  tag: string,
  description: string,
  x: number,
  y: number,
}

export interface TagData {
  slug: string,
  name: string,
  image: string,
  heading: string,
  description: string,
  continent: string,
}

export interface GalleryPhotoData {
  title: string,
  description: string,
  tag: string,
  image: string;
  date: string,
}


/**
 * Fetches data from a document in the database
 * @param collection the name of the collection to fetch from
 * @param id the id of the document to fetch
 * @returns the document's data
 */

export async function fetchDoc<T>(collection: string, id: string) {
  const ref = doc(db, collection, id);
  const snapshot = await getDoc(ref);
  return snapshot.data() as T;
}


/**
 * Fetches all documents from a collection
 * @param name the name of the collection to fetch from
 * @returns the data from all documents in the collection in an array
 */

export async function fetchDocs<T>(name: string, fetchData = true) {
  const ref = collection(db, name);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => fetchData ? doc.data() as T : doc as DocumentData);
}


/**
 * Queries all documents in a collection for documents with a specific field value
 * @param name the name of the collection to query
 * @param field the field in the document to check
 * @param operation the operation to perform on the field
 * @param value the value to check against
 * @param maxDocs the maximum number of documents to query
 * @param fetchData whether to fetch the data of the documents or not
 * @returns the query results in an array
 */

export async function queryDocs<T>(
  name: string,
  field: string | FieldPath,
  operation: WhereFilterOp,
  value: unknown,
  maxDocs = 100,
  fetchData = true,
) {
  const ref = collection(db, name);
  const q = query(ref, where(field, operation, value), limit(maxDocs));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => fetchData ? doc.data() as T : doc as QueryDocumentSnapshot);
}


/**
 * Sorts all the documents in a collection by a specific field value
 * @param name the name of the collection to query
 * @param field the field in the document to order by
 * @param mode the direction to sort the documents in
 * @param maxDocs the maximum number of documents to query
 * @param fetchData whether to fetch the data of the documents or not
 * @returns the query results in an array
 */

export async function orderDocs<T>(
  name: string,
  field: string | FieldPath,
  mode: OrderByDirection,
  maxDocs = 100,
  fetchData = true,
) {
  const ref = collection(db, name);
  const q = query(ref, orderBy(field, mode), limit(maxDocs));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => fetchData ? doc.data() as T : doc as DocumentData);
}


/**
 * Creates a document in the specified collection
 * @param name the name of the collection to create a document in
 * @param data the data to put in the new document
 * @returns a reference to the newly created document
 */

export async function createDoc(name: string, data: unknown) {
  const ref = collection(db, name);
  const docRef = await addDoc(ref, data);
  return docRef;
}


export async function createDocWithId(name: string, id: string, data: unknown) {
  const ref = doc(db, name, id);
  const docRef = await setDoc(ref, data);
  return docRef;
}

/**
 * Updates a document in the specified collection
 * @param collection the name of the collection that contains the document
 * @param id the id of the document to update
 * @param data the data to update the document with
 * @param merge whether to to merge the data with the existing document or not
 */

export async function changeDoc(
  collection: string,
  id: string,
  data: Partial<unknown>,
  merge = true
) {
  const ref = doc(db, collection, id);
  await setDoc(ref, data, { merge });
}

export async function removeDoc(collection: string, id: string) {
  deleteDoc(doc(db, collection, id));
}
