import { Plus, Search, X } from "lucide-react";

function SearchBar({ searchQuery, setSearchQuery, handleClearSearch, filter, handleFilterChange, isLoading, openModal }) {
    return (
        
        <div className="flex flex-row sm:flex-row items-center">
            <div className="flex-grow sm:flex-col-0 mb-2 sm:mb-0 sm:mr-2">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        disabled={isLoading}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="text-gray-400 w-5 h-5" />
                    </div>
                    {searchQuery?.length > 0 && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button onClick={handleClearSearch} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mb-2 sm:mb-0 sm:mr-2">
                <select
                    value={filter}
                    onChange={handleFilterChange}
                    disabled={isLoading}
                    className="text-black px-4 py-2 rounded-md bg-white border border-gray-300"
                >
                    <option value="all">All Notes</option>
                    <option value="pinned">Pinned</option>
                    <option value="unpinned">Unpinned</option>
                </select>
            </div>
            <div className="text-end">
                <button
                    onClick={openModal}
                    disabled={isLoading}
                    title="Add Note"
                    className="bg-[#F7BE38]/90 text-white px-4 py-2  rounded-md hover:bg-[#e7c472]"
                >
                    <span className="flex space-x-2">
                        <Plus className="font-semibold" />
                    </span>
                </button>
            </div>
        </div>


    );
}

export default SearchBar;
