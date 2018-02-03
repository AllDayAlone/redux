const url = 'https://api.github.com/repos/AllDayAlone/urban-guacamole/issues';
const token = '1b813e611871b6316539d2efeae8fee31def39ab';

export const changeTab = tabType => dispatch => {
  dispatch({
    type: 'CHANGE_TAB',
    tabType,
  })
};

export const searchIssue = (e) => dispatch => {
  dispatch({
    type: 'SEARCH_ISSUE',
    searchQuery: e.target.value,
  })
}

export const createIssue = () => dispatch => {
  const newIssue = {
    id: Math.floor(Math.random() * 10000),
    title: 'New Issue!',
    state: 'open',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.`,
  };

  fetch(`${url}?access_token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newIssue),
  });

  dispatch({
    type: 'CREATE_ISSUE',
    newIssue,
  })
};

export const fetchData = () => dispatch => {
  fetch(`${url}?access_token=${token}&state=all`)
    .then(response => response.json())
    .then(payload => dispatch({
      type: 'FETCH_DATA',
      payload,
    }))
}

//...Close\Reopen
export const patchIssue = (issue, state) => dispatch => {
  fetch(`${url}/${issue.number}?access_token=${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state })
  });

  const type = `${state === 'open' ? 'REOPEN' : 'CLOSE'}_ISSUE`;

  dispatch({
    type,
    issue,
  })
}
