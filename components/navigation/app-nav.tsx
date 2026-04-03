
import { auth } from '@/server/auth'
import DesktopNav from './desktop/desktop-nav'
import MobileNav from './mobile/mobile-nav';


const AppNav = async() => {
  const session = await auth();


  return (
    <>
      <DesktopNav user={session?.user} />
      <MobileNav />
    </>
  )
}

export default AppNav