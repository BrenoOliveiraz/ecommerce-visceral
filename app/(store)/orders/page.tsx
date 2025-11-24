
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Orders() {
    const { userId } = await auth()



    if (!userId) {
        return redirect('/')
    }



    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4'>
            <div className='bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl'>
                
            </div>

        </div>
    )
}
