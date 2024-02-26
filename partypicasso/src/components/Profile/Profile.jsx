import { useState } from "react"
import 'react-multiple-select-dropdown-lite/dist/index.css'

const Profile = () => {

    const [userData, setUserData] = useState({
        user_id: "1",
        university: "",
        githublink: "",
        linkedinlink: [],
        YOE: "",
        bio: "",
    })


    const handleChange = (e) => {
        console.log("e", e)
        const value = e.target.value
        const name = e.target.name

        setUserData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (e) => {
        console.log("clicked here")
        e.preventDefault()
        console.log(userData)
    }

    return (
        <>
            <div className="userdata">
                <h2>User Details</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="university">University</label>
                        <input
                            id="university"
                            type="text"
                            name="university"
                            placeholder="Enter University"
                            required={true}
                            value={userData.university}
                            onChange={handleChange}
                        />

                        <label htmlFor="githublink">Github </label>
                        <input
                            id="githublink"
                            type="text"
                            name="githublink"
                            placeholder="Enter Github Link"
                            required={true}
                            value={userData.githublink}
                            onChange={handleChange}
                        />
                        <label htmlFor="linkedinlink">LinkedIn </label>
                        <input
                            id="linkedinlink"
                            type="text"
                            name="linkedinlink"
                            placeholder="Enter LinkedIn Link"
                            required={true}
                            value="http://linked/demon1.com"
                            onChange={handleChange}
                        />
                        <label htmlFor="YOE">Years of Experience</label>
                        <input
                            id="YOE"
                            type="number"
                            name="YOE"
                            placeholder="Years"
                            required={true}
                            value = "1"
                            onChange={handleChange}
                        />
                        <input className="submit-button" type="submit" />
                    </section>
                    <section>
                        <label htmlFor="bio">Short Bio</label>
                        <input
                            id="bio"
                            type="text"
                            name="bio"
                            required={true}
                            placeholder="Enter Bio"
                            value="I like to sing"
                            onChange={handleChange}
                        />
                    </section>
                </form>
            </div >

        </>
    )
}
export default Profile