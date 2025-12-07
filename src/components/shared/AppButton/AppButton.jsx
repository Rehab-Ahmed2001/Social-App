import { Button, Spinner } from 'flowbite-react'
import React from 'react'

export default function AppButton({ children, isloading, ...props }) {
    return (
        <Button type="submit"  {...props}>
            {isloading && (
                <Spinner
                    size="sm"
                    aria-label="Info spinner example"
                    className="me-3" light />
            )}

            {children}
        </Button>
    )
}

