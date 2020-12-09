import React, {
    useContext,
    useState,
    createContext,
    ReactElement,
    ReactNode
  } from 'react'

import { Profile } from '../models/Profile'

interface ProfileProviderValue {
    profile: Profile | undefined
    setProfile: (profileData: Profile ) => void
}

const ProfileContext = createContext({} as ProfileProviderValue)

function ProfileProvider({
    children
  }: {
    profile: Profile | undefined
    children: ReactNode
  }): ReactElement {

    const [profile, setProfile] = useState<Profile>()

    return (
        <ProfileContext.Provider
          value={
            {
              profile,
              setProfile
            } as ProfileProviderValue
          }
        >
          {children}
        </ProfileContext.Provider>
      )
  }

const useProfile = (): ProfileProviderValue => useContext(ProfileContext)

export { ProfileProvider, useProfile, ProfileProviderValue, ProfileContext }
export default ProfileProvider