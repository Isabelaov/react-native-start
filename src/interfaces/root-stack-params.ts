import {Contact} from './contact';

export type RootStackParams = {
  ContactList: {contact?: Contact};
  ContactToHandle: {id?: string; contact?: Contact};
};
