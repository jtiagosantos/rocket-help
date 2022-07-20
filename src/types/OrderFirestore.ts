import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface OrderFirestore {
  patrimony: string;
  description: string;
  status: 'opened' | 'closed';
  solution?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at: FirebaseFirestoreTypes.Timestamp;
}
