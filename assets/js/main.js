$(document).ready(function() {
    // 移动端导航菜单
    $('.hamburger').click(function() {
        $('.nav-links').toggleClass('active');
        $(this).toggleClass('active');
    });

    // 轮播图初始化
    function initSlider() {
        const slides = window.appData.slides;
        const sliderContainer = $('.slider-container');
        const dotsContainer = $('.slider-dots');

        // 生成轮播图内容
        slides.forEach((slide, index) => {
            const slideHtml = `
                <div class="slide ${index === 0 ? 'active' : ''}" style="background: linear-gradient(45deg, #f3f3f3, #e0e0e0);">
                    <div class="slide-content">
                        <h2>${slide.title}</h2>
                        <p>${slide.description}</p>
                    </div>
                </div>
            `;
            sliderContainer.append(slideHtml);

            // 生成指示点
            const dotHtml = `
                <span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
            `;
            dotsContainer.append(dotHtml);
        });

        let currentSlide = 0;
        const slideCount = slides.length;

        // 显示指定幻灯片
        function showSlide(index) {
            $('.slide').removeClass('active');
            $('.dot').removeClass('active');
            $(`.slide:eq(${index})`).addClass('active');
            $(`.dot:eq(${index})`).addClass('active');
            currentSlide = index;
        }

        // 下一张幻灯片
        function nextSlide() {
            let next = currentSlide + 1;
            if (next >= slideCount) {
                next = 0;
            }
            showSlide(next);
        }

        // 上一张幻灯片
        function prevSlide() {
            let prev = currentSlide - 1;
            if (prev < 0) {
                prev = slideCount - 1;
            }
            showSlide(prev);
        }

        // 自动播放
        let slideInterval = setInterval(nextSlide, 5000);

        // 鼠标悬停时暂停自动播放
        $('.hero-slider').hover(
            function() {
                clearInterval(slideInterval);
            },
            function() {
                slideInterval = setInterval(nextSlide, 5000);
            }
        );

        // 点击指示点切换幻灯片
        $('.dot').click(function() {
            const index = $(this).data('index');
            showSlide(index);
        });

        // 点击按钮切换幻灯片
        $('.slider-btn.next').click(nextSlide);
        $('.slider-btn.prev').click(prevSlide);
    }

    // 分类展示初始化
    function initCategories() {
        const categories = window.appData.categories;
        const categoryGrid = $('.category-grid');

        categories.forEach(category => {
            const categoryHtml = `
                <div class="category-card">
                    <div class="category-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <h3>${category.name}</h3>
                    <p>${category.subCategories.join(' · ')}</p>
                </div>
            `;
            categoryGrid.append(categoryHtml);
        });
    }

    // 特色内容初始化
    function initFeatures() {
        const features = window.appData.features;
        const featureGrid = $('.feature-grid');

        features.forEach(feature => {
            const featureHtml = `
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="${feature.icon}"></i>
                    </div>
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                </div>
            `;
            featureGrid.append(featureHtml);
        });
    }

    // 初始化页面
    initSlider();
    initCategories();
    initFeatures();

    // 滚动动画
    $(window).scroll(function() {
        $('.category-card, .feature-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('fade-in');
            }
        });
    });

    // 平滑滚动
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 500);
        }
    });
}); 