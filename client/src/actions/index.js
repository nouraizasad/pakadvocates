import API from '../api/jsonPlaceholder'
import config from '../config/config';
import history from '../history';

export const postLawyer = (lawyer, path) => dispatch => {

    API.post('/lawyer/', lawyer)
        .then(res => {
            console.log('New lawyer created:', res.data);
            history.push(path);
        })
        .catch(err => {
            console.log('Error: Could not create new lawyer.');
        })

}

export const deleteLawyer = (lawyerId) => dispatch => {

    return API.delete(`/lawyer/${lawyerId}`)
        .catch(err => {
            console.log('Error: Could not delete lawyer request.');
        })

}

export const putLawyer = (lawyer, lawyerId) => dispatch => {
    return API.put(`/lawyer/${lawyerId}`, lawyer)
        .catch(err => {
            console.log('Error updating lawyer approval status. API call failed.')
        })
}

export const getUnapprovedLawyers = () => dispatch => {

    API.get('/lawyer/byApprovalStatus/0')
        .then(res => {
            console.log('All pending lawyers retrieved.')

            dispatch({
                type: 'GET_PENDING_LAWYERS',
                unapprovedLawyers: [...res.data]
            })
        })
        .catch(err => {
            console.log('Error: Could not get all pending lawyers.')
        })

}

export const getApprovedLawyers = () => dispatch => {

    API.get('/lawyer/byApprovalStatus/1')
        .then(res => {
            console.log('All approved lawyers retrieved.')

            dispatch({
                type: 'GET_APPROVED_LAWYERS',
                approvedLawyers: [...res.data]
            })
        })
        .catch(err => {
            console.log('Error: Could not get all approved lawyers.')
        })

}

export const adminLoginVerify = (admin, path) => dispatch => {

    return API.post('/admin/login', admin)
        .then(res => {
            console.log('Admin found:', res.data);
            history.push(path);

            let { data: admin } = res;

            delete admin.password;

            dispatch({
                type: 'ADMIN_LOGIN',
                admin
            })
        })

}

export const logoutAdmin = () => (
    {
        type: 'ADMIN_LOGOUT',
    }
)

export const postCourtCategory = (courtCategory) => dispatch => {

    return API.post(`/courtCategory`, courtCategory)
        .catch(err => {
            console.log('Error: Could not create court category. API call failed.');
        })

}

export const deleteCourtCategory = (courtCategoryId) => dispatch => {
    return API.delete(`/courtCategory/${courtCategoryId}`)
        .catch(err => {
            console.log('Error: Could not delete court category. API call failed.');
        })
}

export const getCourtCategories = () => dispatch => {
    API.get(`/courtCategory`)
        .then(res => {
            console.log('-----------------------GET court catgories', res);
            dispatch({
                type: 'GET_COURT_CATEGORIES',
                courtCategories: [...res.data]
            })
        })
        .catch(err => {
            console.log('Error: Could not get court categories. API call failed.');
        })
}
