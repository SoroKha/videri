import { Box, TextField } from '@mui/material'
import styles from './Header.module.css'
import logo from '../../../public/logos/videri_logo.png'
import profile from '../../../public/profile_images/soroush.png'

export default function HeaderBar() {

  return (
    <>
    <Box className={styles.headerBar}>
      <img
      src={logo}
      className={styles.logo}
      width='60px'
      />
      <div className={styles.searchWrapper}>
        <input placeholder='Search' className={styles.searchBar} />
      </div>
      <img
      src={profile}
      className={styles.profileImage}
      width='38 px'
      />
    </Box>
    </>
  )
}