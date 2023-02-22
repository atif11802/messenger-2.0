import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

const SignIn = async () => {
	const providers = await getProviders();

	return (
		<div className='grid justify-center'>
			<div>
				<Image
					src='https://links.papareact.com/161'
					width={700}
					height={700}
					alt='logo'
					className='rounded-full mx-3 object-cover'
				/>
			</div>

			<SignInComponent providers={providers} />
		</div>
	);
};

export default SignIn;
