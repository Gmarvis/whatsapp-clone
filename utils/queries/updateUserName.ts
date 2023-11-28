import { User } from "@/type"
import { supabase } from "../supabase/client"

const updateUserName = async (name: string) => {
	const currentUser: User = JSON.parse(localStorage.getItem('sender') || '{}')
	// console.log(name)
	const { data, error } = await supabase
		.from('user')
		.update({ name: name })
		.eq('id', currentUser.id)
		.select()
	
	if (error) console.log("could not update", error)
	if (data) {
		console.log('successfully updated', data)
	}
}
export default updateUserName