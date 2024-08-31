import React from 'react'

const pract = () => {
    return (
        <div>
            <header class="w-full bg-primary-bg fixed inset-x-0 top-0 flex flex-col justify-center items-center z-10 shadow-box-sm">
                <div class="max-w-screen-xl w-full px-4 flex h-16 sm:h-auto flex-row">
                    <div class="items-center justify-center w-full sm:py-3 gap-4 relative flex flex-row">
                        <div class="flex-1 items-center my-0 flex flex-row">
                            <div class="flex cursor-pointer flex-col">
                                <a href="/">
                                    <div class="w-24 h-6 sm:w-40 sm:h-9 flex flex-col">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 38" class="h-6 sm:h-10 w-20 sm:w-32">
                                        </svg>
                                    </div>
                                </a>
                            </div>
                            <div class="sm:w-full flex flex-col">
                                <div class="flex-1 flex flex-col" id="lego-select">
                                    <div class="visible flex flex-col rounded-md bg-primary-bg sm:bg-surface-light sm:px-0 shadow-none">
                                        <div class="h-12 justify-center rounded-md flex-shrink-0 bg-primary-bg sm:bg-surface-light sm:px-0 flex flex-col">
                                            <div class="flex flex-row items-center relative w-full px-0 py-2"><div class="flex justify-center items-center px-2 h-full sm:hidden hidden flex-col">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary-text sm:hidden">
                                                </svg>
                                                <input type="text" id="Global search Container" class="peer p-0 bg-transparent placeholder:text-surface-text/70 p-0 body2 w-2/3 sm:w-full placeholder:text-surface-text/70 placeholder:text-xs sm:placeholder:text-md text-primary-text" placeholder="Search for mobiles, accessories &amp; More" autocomplete="off" autofocus="" value="" />
                                            </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* <div class="flex items-center justify-end flex-col">
                                <div class="flex flex-row justify-between">
                                    <div class="flex flex-row items-center justify-center cursor-pointer text-primary-text ">
                                        <svg id="Group_34611" data-name="Group 34611" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                                            <g id="Boundry"><rect id="Rectangle_621" data-name="Rectangle 621" width="26" class="fill-none" height="26"></rect></g></svg><div class="inherit body1">Gurgaon</div><div class="w-4 h-4 flex flex-col"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-primary-text"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd"></path></svg></div></div><div class="hidden sm:block flex flex-col" id="login-view"><span class="body3 flex flex-row text-primary-text items-center justify-center ps-5 ml-1 cursor-pointer"><div class="flex-col w-28 h-9 flex" id="lego-ripple"><div class="relative overflow-hidden flex flex-col"><button type="button" role="button" class="flex flex-row justify-center items-center rounded-md bg-cta"><span class="inherit text-cta-text-contrast text-md font-medium py-1.5 px-4">Login</span></button></div></div></span></div></div></div></div></div><span class="border-surface-border border-b border-t-0 border-solid w-full my-1 my-0 sm:my-0 flex flex-col"></span></header>
                                            </div> */}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default pract