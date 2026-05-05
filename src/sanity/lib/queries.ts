export const heroQuery = `*[_type == "hero"][0]`
export const projectsQuery = `*[_type == "projects"] | order(featured desc, _createdAt desc)`
export const experienceQuery = `*[_type == "experience"] | order(startDate desc)`
export const skillsQuery = `*[_type == "skills"][0]`
export const siteConfigQuery = `*[_type == "siteConfig"][0]`
export const sectionsQuery = `*[_type == "section"] | order(order asc)`
export const blogsQuery = `*[_type == "blog"] | order(publishedAt desc)`
export const achievementsQuery = `*[_type == "achievement"] | order(date desc)`
export const openSourceQuery = `*[_type == "openSource"] | order(_createdAt desc)`
export const testimonialQuery = `*[_type == "testimonial"]`
export const certificationsQuery = `*[_type == "certifications"]`
export const aboutQuery = `*[_type == "about"][0]`
export const contactQuery = `*[_type == "contact"][0]`
