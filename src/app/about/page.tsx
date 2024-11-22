import { Container } from "@/components/Container";

export default function AboutUs() {
    return (
        <>
            <Container className="flex flex-wrap">
                {/* Section 1: Company Overview */}
                <div className="w-full md:w-1/2 p-4">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg text-gray-700">
                        Welcome to [Your Company Name]! We are passionate about delivering 
                        exceptional [services/products] to our customers and making a difference 
                        in the [industry/domain] space.
                    </p>
                </div>

                {/* Section 2: Mission or Vision Statement */}
                <div className="w-full md:w-1/2 p-4">
                    <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                    <p className="text-lg text-gray-700">
                        Our mission is to [your mission statement here]. We aim to innovate, inspire, 
                        and create value for our clients and community.
                    </p>
                </div>

                {/* Section 3: Team or Values */}
                <div className="w-full mt-6">
                    <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Integrity and transparency</li>
                        <li>Customer satisfaction</li>
                        <li>Commitment to quality</li>
                        <li>Innovation and adaptability</li>
                    </ul>
                </div>
            </Container>
        </>
    );
};
