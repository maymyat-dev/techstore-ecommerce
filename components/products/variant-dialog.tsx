import { VariantsWithImageTags } from '@/lib/infer-types'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { DialogHeader } from '../ui/dialog'

type VariantDialogProps = {
    children: React.ReactNode,
    editMode: boolean,
    productId?: number,
    variant?: VariantsWithImageTags
}

const variantDialog = ({children, editMode, productId, variant} : VariantDialogProps) => {
    return <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{editMode ? "Update Product's Variant" : "Create New Variant"}</DialogTitle>
            </DialogHeader>
            <DialogDescription>Manage your product's variants</DialogDescription>
        </DialogContent>
  </Dialog>
}

export default variantDialog