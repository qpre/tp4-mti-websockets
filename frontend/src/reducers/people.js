// @flow

// Actions types are defined as string constants
export const ADD = 'PEOPLE_ADD';
export const REMOVE = 'PEOPLE_REMOVE';

// What makes a beautiful people ?
type People = {
  id: number,
  name: string,
};

// Well obviously, if you're clever you won't do this.
let PEOPLE_ID = 0;

// Nor would you do this.
const mockPeople: Array<People> = [
  { id: PEOPLE_ID++, name: "Laura Palmer" },
  { id: PEOPLE_ID++, name: "Dale Cooper" },
  { id: PEOPLE_ID++, name: "Audrey Horne" },
  { id: PEOPLE_ID++, name: "Donna Hayward" },
  { id: PEOPLE_ID++, name: "Shelly Johnson" },
  { id: PEOPLE_ID++, name: "James Hurley" },
  { id: PEOPLE_ID++, name: "Andy Brennan" },
]

// f(x) => y;
const people = (state: Array<People> = mockPeople, action: Object): Array<People> => {
  switch (action.type) {
    case ADD:
      return [...state, { id: PEOPLE_ID++, name: action.name }];
    case REMOVE:
      return state.filter(p => p.id !== action.id);
    default:
      return state;
  }
}

export default people;