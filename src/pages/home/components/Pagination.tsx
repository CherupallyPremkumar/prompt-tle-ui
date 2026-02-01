import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    maxPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          maxPages,
                                                          onPageChange,
                                                      }) => {
    const getPageNumbers = () => {
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | string)[] = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(maxPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < maxPages - 1) {
            rangeWithDots.push('...', maxPages);
        } else if (maxPages > 1) {
            rangeWithDots.push(maxPages);
        }

        return rangeWithDots;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="text-sm text-gray-600 font-medium">
                    Page <span className="font-black text-gray-900">{currentPage}</span> of{' '}
                    <span className="font-black text-gray-900">{maxPages}</span>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                    {/* First Page */}
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all group"
                        aria-label="First page"
                    >
                        <ChevronsLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                    </button>

                    {/* Previous Page */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all group"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                    </button>

                    {/* Page Numbers */}
                    <div className="hidden sm:flex items-center gap-2">
                        {pageNumbers.map((pageNum, index) => {
                            if (pageNum === '...') {
                                return (
                                    <span
                                        key={`dots-${index}`}
                                        className="px-3 py-2 text-gray-400 font-bold"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            const isActive = pageNum === currentPage;

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum as number)}
                                    className={`min-w-[2.5rem] px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                                        isActive
                                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    {/* Mobile Page Display */}
                    <div className="sm:hidden px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-black text-sm shadow-lg shadow-orange-500/30">
                        {currentPage}
                    </div>

                    {/* Next Page */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === maxPages}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all group"
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                    </button>

                    {/* Last Page */}
                    <button
                        onClick={() => onPageChange(maxPages)}
                        disabled={currentPage === maxPages}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all group"
                        aria-label="Last page"
                    >
                        <ChevronsRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                    </button>
                </div>
            </div>
        </div>
    );
};