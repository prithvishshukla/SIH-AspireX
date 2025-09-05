import React from 'react';
import { Leaf, Shield, Calendar, BarChart3 } from 'lucide-react';

interface HeroSectionProps {
	onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
	return (
		<section className="relative overflow-hidden">
			{/* Background gradient blob */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-200 blur-3xl opacity-40" />
				<div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-teal-200 blur-3xl opacity-40" />
			</div>

			<div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div>
					<div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium mb-4">
						<Shield className="w-4 h-4" />
						<span>Panchakarma Care, Reimagined</span>
					</div>
					<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
						AyurSutra
					</h1>
					<p className="mt-4 text-lg text-gray-600 max-w-xl">
						A comprehensive platform to manage therapies, track wellness progress, and streamline your
						Panchakarma journey for patients, practitioners, and admins.
					</p>
					<div className="mt-8 flex flex-col sm:flex-row gap-3">
						<button
							onClick={onGetStarted}
							className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 font-medium shadow-sm hover:shadow-md hover:scale-[1.01] transition"
						>
							<Leaf className="w-5 h-5 mr-2" />
							Get Started
						</button>
						<a
							href="#features"
							className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
						>
							Learn More
						</a>
					</div>

					<div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="rounded-xl border border-emerald-100 bg-white p-4">
							<Calendar className="w-5 h-5 text-emerald-600" />
							<div className="mt-2 text-sm text-gray-600">Smart Scheduling</div>
						</div>
						<div className="rounded-xl border border-emerald-100 bg-white p-4">
							<BarChart3 className="w-5 h-5 text-emerald-600" />
							<div className="mt-2 text-sm text-gray-600">Progress Tracking</div>
						</div>
						<div className="rounded-xl border border-emerald-100 bg-white p-4">
							<Shield className="w-5 h-5 text-emerald-600" />
							<div className="mt-2 text-sm text-gray-600">Care Guidance</div>
						</div>
					</div>
				</div>

				<div className="relative">
					<div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-6">
						<div className="grid grid-cols-2 gap-4">
							<div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white">
								<div className="text-sm opacity-90">Wellness Score</div>
								<div className="text-3xl font-bold mt-1">4.8/5</div>
							</div>
							<div className="rounded-2xl bg-emerald-50 p-5">
								<div className="text-sm text-emerald-700">Sessions Completed</div>
								<div className="text-3xl font-bold text-emerald-600 mt-1">12</div>
							</div>
							<div className="rounded-2xl bg-blue-50 p-5">
								<div className="text-sm text-blue-700">Energy Level</div>
								<div className="text-3xl font-bold text-blue-600 mt-1">85%</div>
							</div>
							<div className="rounded-2xl bg-purple-50 p-5">
								<div className="text-sm text-purple-700">Goals Achieved</div>
								<div className="text-3xl font-bold text-purple-600 mt-1">3</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
