import ProfileBody from '../components/ProfileBody'
import profilePicture from '../assets/images/DefaultProfilePicture.svg'
import PageTitle from '../components/PageTitle'

const ProfilePage = () => {

    return (
        <>
                <PageTitle>
                    Profile
                </PageTitle>
            <div className='mt-8 mx-8 flex flex-col justify-center items-center'>
                <ProfileBody
                    username={"demo-user"}
                    email={"user@tabbi-demo.com"}
                    picture={profilePicture}
                />
            </ div>
        </>
    )
}

export default ProfilePage