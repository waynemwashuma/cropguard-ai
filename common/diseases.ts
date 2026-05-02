export enum Disease {
    Healthy,
    GreyLeaf,
    Rust,
    Blight
}

export function getDiseaseName(disease: Disease) {
    switch (disease) {
        case Disease.Healthy:
            return "healthy"
        case Disease.Rust:
            return "common rust"
        case Disease.GreyLeaf:
            return "greyleaf spot"
        case Disease.Blight:
            return "northern leafblight"
        default:
         throw new Error("Undefined disease detected")
    }
}

// TODO: Sync this with the pdf information
export function getDiseaseTreatment(disease:Disease){
         switch (disease) {
        case Disease.Healthy:
            return "healthy"
        case Disease.Rust:
            return "healthy"
        case Disease.GreyLeaf:
            return "healthy"
        case Disease.Blight:
            return "healthy"
        default:
         throw new Error("Undefined disease detected")
    }
}