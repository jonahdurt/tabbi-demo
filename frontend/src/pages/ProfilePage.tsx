import ProfileBody from '../components/ProfileBody'
import profilePicture from '../assets/images/DefaultProfilePicture.svg'

const ProfilePage = () => {

    return (
        <>
            <div className='mt-16 mb-10 mx-8 flex justify-between'>
                <div>
                    <div>
                        <h1 className='text-5xl font-semibold mb-10'>
                            Profile
                        </h1>
                        <ProfileBody
                            username={"demo-user"}
                            email={"user@tabbi-demo.com"}
                            picture={profilePicture}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage