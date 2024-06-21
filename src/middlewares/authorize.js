const accessRules = {
    Initiator: {
        canAccess: [
            { route: '/profile', accessType: 'read' },
            { route: '/manage-role',accessType: null }
        ]
    },
    Approver: {
        canAccess: [
            { route: '/profile', accessType: 'read-write' },
            { route: '/manage-role' ,accessType: null}
        ]
    },
    Admin: {
        canAccess: [
            { route: '/manage-role', accessType: 'read-write' },
            { route: '/profile', accessType: 'read-write' },
        ]
    },
    DataManager: {
        canAccess: [
            { route: '/manage-role', accessType: 'read' },
            { route: '/profile', accessType: 'read-write' },
        ]
    }
};


function authorize(req, res, next) {
    const { role, accessType } = req.body; // Assuming role and accessType are sent in the request body

    if (!role || !accessType) {
        return res.status(400).send({ error: 'Role and accessType are required.' });
    }
    console.log("accessrules",accessRules[role]);
    const accessRulesForRole = accessRules[role];

    if (!accessRulesForRole) {
        return res.status(403).send({ error: 'Access denied. Role not found.' });
    }
    console.log("route",req.baseUrl);

    const hasAccess = accessRulesForRole.canAccess.some(rule => {
        return rule.route === req.baseUrl && rule.accessType === accessType;
    });

    if (!hasAccess) {
        return res.status(403).send({ error: 'Access denied. Insufficient permissions.' });
    }

    next();
}
module.exports = authorize;