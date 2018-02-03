import initialData from '../../issues-data.js';
const initialState = {
  issues: initialData,
  activeTab: 'open',
  openIssues: 4,
  closedIssues: 1,
  searchQuery: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_TAB':
      return {
        ...state,
        activeTab: action.tabType,
      };
    case 'SEARCH_ISSUE':
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    case 'CREATE_ISSUE':
      return {
        ...state,
        issues: [...state.issues, action.newIssue],
        openIssues: state.openIssues + 1,
      };
    case 'FETCH_DATA':
      console.log(action.payload);
      return {
        ...state,
        issues: action.payload,
        openIssues: action.payload.filter(issue => issue.state === 'open'),
        closedIssues: action.payload.filter(i => i.state === 'closed'),
      };
    case 'REOPEN_ISSUE':
      return {
        ...state,
        openIssues: state.openIssues + 1,
        closedIssues: state.closedIssues - 1,
        issues: state.issues
          .map(issue => issue.id === action.issue.id
          ? {...issue, ...action.issue, state: 'open'} : issue),
      }
    case 'CLOSE_ISSUE':
      return {
        ...state,
        openIssues: state.openIssues - 1,
        closedIssues: state.closedIssues + 1,
        issues: state.issues
          .map(issue => issue.id === action.issue.id
          ? {...issue, ...action.issue, state: 'closed'} : issue),
      }
    default:
      return state;
  }
}

export default reducer;
