import { User } from "@/type"
import { supabase } from "../supabase/client"
import { LOCAL_STORAGE } from "../service/storage"

const updatePhoneNumber = async (phone: string | undefined) => {
	const currentUser: User = JSON.parse(localStorage.getItem('sender') || '{}')
	// console.log(name)
	const { data, error } = await supabase
		.from('user')
		.update({ phone: phone })
		.eq('id', currentUser.id)
		.select()
	
	if (error) console.log("could not update", error)
	if (data) {
		LOCAL_STORAGE.save('sender', data)
		console.log('successfully updated', data)
	}
}
export default updatePhoneNumber