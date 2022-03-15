const initState = {
  user: null,
  dashboard: {},
};

const reducer = (state, action) => {
  const s = state || initState;
  switch (action.type) {
    case 'USER': {
      return { ...s, user: action.payload.data };
    }
    case 'LOGOUT': {
      return { ...s, user: action.payload };
    }
    case 'BOARDS': {
      return { ...s, dashboard: action.payload };
    }
    case 'PHONE': {
      return { ...s, user: { ...s.user, user: { ...s.user.user, phone: action.payload } } };
    }
    case 'EMAIL': {
      return { ...s, user: { ...s.user, user: { ...s.user.user, email: action.payload } } };
    }
    case 'TITLE': {
      return { ...s, user: { ...s.user, user: { ...s.user.user, title: action.payload } } };
    }
    case 'PIC': {
      return { ...s, user: { ...s.user, user: { ...s.user.user, pic: action.payload } } };
    }

    default: return s;
  }
};

export default reducer;
