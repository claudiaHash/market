import React, { ReactElement } from 'react'
import Button from '../../atoms/Button'
import styles from './Details.module.css'
import { useOcean } from '@oceanprotocol/react'
import Web3Feedback from './Feedback'
import { getInjectedProviderName } from 'web3modal'
import Conversion from '../../atoms/Price/Conversion'
import { Profile } from '../../../models/Profile'
import { formatCurrency } from '@coingecko/cryptoformat'
import { useUserPreferences } from '../../../providers/UserPreferences'
import ProfileDetails  from '../../atoms/Publisher/ProfileDetails'
import { useProfile } from '../../../providers/Profile'


export default function Details (): ReactElement {
  const { balance, connect, logout, account, networkId } = useOcean()
  const { locale } = useUserPreferences()
  const { profile } = useProfile()

  return (
    <div className={styles.details}>
      <ul>
        {Object.entries(balance).map(([key, value]) => (
          <li className={styles.balance} key={key}>
            <span className={styles.symbol}>{key.toUpperCase()}</span>{' '}
            {formatCurrency(Number(value), '', locale, false, {
              significantFigures: 4
            })}
            {key === 'ocean' && <Conversion price={value} />}
          </li>
        ))}
        <ProfileDetails profile={profile} networkId={networkId} account={account.getId()} />
        <li className={styles.actions}>
          <span title="Connected provider">{getInjectedProviderName()}</span>
          <Button
            style="text"
            size="small"
            onClick={() => {
              logout()
              connect()
            }}
          >
            Switch Wallet
          </Button>
        </li>
      </ul>
      <Web3Feedback />
    </div>
  )
}
