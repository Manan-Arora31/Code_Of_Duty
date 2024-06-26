import nodemailer from "nodemailer";

export default async (email, subject, text) => {
	try {
		console.log("yes")
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});
		transporter.verify((err, success) => {
			if (err) console.error(err);
			console.log('Your config is correct');
		});
        console.log("yes")
		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
