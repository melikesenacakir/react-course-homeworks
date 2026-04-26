import { useDispatch, useSelector } from "react-redux"
import { setPage, type PaginationKey } from "../store/pagination/paginationSlice"
import type { RootState } from "../store"

interface PaginationProps {
    paginationKey: PaginationKey
    totalPages: number
}

const Pagination = ({ paginationKey, totalPages }: PaginationProps) => {
    const dispatch = useDispatch()
    const { page } = useSelector((state: RootState) => state.pagination[paginationKey])

    return (
        <div className="flex justify-center mt-8">
            <div className="join grid grid-cols-2 gap-2">
                <button
                    className="join-item btn btn-outline"
                    disabled={page === 1}
                    onClick={() => dispatch(setPage({ key: paginationKey, page: page - 1 }))}
                >
                    Önceki
                </button>
                <button
                    className="join-item btn btn-outline"
                    disabled={page === totalPages}
                    onClick={() => dispatch(setPage({ key: paginationKey, page: page + 1 }))}
                >
                    Sonraki
                </button>
            </div>
        </div>
    )
}

export default Pagination