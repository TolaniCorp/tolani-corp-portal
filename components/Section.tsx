import clsx from 'clsx'
import { ReactNode } from 'react'

export function Section({
    id,
    title,
    children,
    className,
    invert = false,
}: {
    id?: string
    title?: string
    children: ReactNode
    className?: string
    invert?: boolean
}) {
    return (
        <section
            id={id}
            className={clsx(
                'py-24 sm:py-32',
                invert ? 'bg-tolani-black text-white' : 'bg-white text-tolani-black',
                className
            )}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {title && (
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className={clsx("text-3xl font-bold tracking-tight sm:text-4xl", invert ? 'text-white' : 'text-tolani-black')}>
                            {title}
                        </h2>
                    </div>
                )}
                <div className={clsx(title && 'mt-16', 'mx-auto max-w-2xl lg:mx-0 lg:max-w-none')}>
                    {children}
                </div>
            </div>
        </section>
    )
}

export function FadeIn({ className, children }: { className?: string; children: ReactNode }) {
    return <div className={className}>{children}</div>
}
