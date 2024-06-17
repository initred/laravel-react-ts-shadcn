import { Icon } from '@iconify/react'

export default function Footer({ transparent = false }: { transparent?: boolean }) {
  const links = [
    {
      name: 'LinkedIn',
      icon: 'ri:linkedin-box-fill',
      href: '#',
    },
    {
      name: 'Instagram',
      icon: 'ri:instagram-line',
      href: '#',
    },
    {
      name: 'Twitter',
      icon: 'ri:twitter-x-line',
      href: '#',
    },
    {
      name: 'GitHub',
      icon: 'ri:github-fill',
      href: '#',
    },
    {
      name: 'YouTube',
      icon: 'ri:youtube-fill',
      href: '#',
    },
  ]

  return (
    <footer
      className={transparent ? 'fixed bottom-0 w-full bg-transparent' : 'bg-white dark:bg-black'}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{link.name}</span>
              <Icon icon={link.icon} className="size-6" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
