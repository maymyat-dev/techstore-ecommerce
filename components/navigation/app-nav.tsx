
import { auth } from '@/server/auth'
import DesktopNav from './desktop-nav'
import MobileNav from './mobile-nav';


const AppNav = async() => {
  const session = await auth();


  return (
    <>
      <DesktopNav user={session?.user} />
      <MobileNav user={session?.user} />
    </>
  )
}

export default AppNav