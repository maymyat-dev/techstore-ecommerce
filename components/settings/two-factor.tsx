import React from 'react'
import { SettingCard } from './settings-card'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'
import { Switch } from "@/components/ui/switch"

const TwoFactorAuthentication = () => {
  return (
    <SettingCard>
      <div className='flex items-center justify-between'>
        <p>Two Factor Authentication</p>
       <Switch id="two-factor" />
      </div>

    </SettingCard>
  )
}

export default TwoFactorAuthentication