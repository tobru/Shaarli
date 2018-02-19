<?php

/**
 * Plugin Lobsters.
 */

use Shaarli\Config\ConfigManager;

/**
 * Init function, return an error if the server is not set.
 *
 * @param $conf ConfigManager instance.
 *
 * @return array Eventual error.
 */
function lobsters_init($conf)
{
    $lobstersUrl = $conf->get('plugins.LOBSTERS_URL');
    if (empty($lobstersUrl)) {
        $error = t('Lobsters plugin error: '.
            'Please define the "LOBSTERS_URL" setting in the plugin administration page.');
        return array($error);
    }
}

/**
 * Add lobsters icon to link_plugin when rendering linklist.
 *
 * @param mixed         $data Linklist data.
 * @param ConfigManager $conf Configuration Manager instance.
 *
 * @return mixed - linklist data with wallabag plugin.
 */
function hook_lobsters_render_linklist($data, $conf)
{
    $lobstersUrl = $conf->get('plugins.LOBSTERS_URL');
    if (empty($lobstersUrl)) {
        return $data;
    }

    $lobstersHtml = file_get_contents(PluginManager::$PLUGINS_PATH . '/lobsters/lobsters.html');

    $linkTitle = t('Save to Lobsters');
    foreach ($data['links'] as &$value) {
        $lobsters = sprintf(
            $lobstersHtml,
            $lobstersUrl,
            urlencode($value['url']),
            PluginManager::$PLUGINS_PATH,
            $linkTitle
        );
        $value['link_plugin'][] = $lobsters;
    }

    return $data;
}

/**
 * This function is never called, but contains translation calls for GNU gettext extraction.
 */
function lobsters_dummy_translation()
{
    // meta
    t('Lobsters API URL');
}

