import React from 'react'
import PropTypes from 'prop-types'

const AccountList = ({ records : { accounts } }) => (
  <ul>
    {accounts.map(account =>
      <li className="Account">
        <div className="Account__name">
          {account.Name}
        </div>
        <div className="Account__id">
          {account.id}
        </div>
      </li>
    )}
  </ul>
)

AccountList.propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    Name: PropTypes.bool.isRequired,
    attributes: PropTypes.object
  }).isRequired).isRequired,
}

export default AccountList
