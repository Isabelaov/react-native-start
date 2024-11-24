import { Contact } from './contact';
import { User } from './user';

export type RootStackParams = {
  ContactList: { contact?: Contact };
  ContactToHandle: { id?: string; contact?: Contact };
  ContactView: { contact: Contact };
  LogIn: undefined;
  UserToHandle: { id?: string; user?: User };
  Onboarding: undefined;
};
